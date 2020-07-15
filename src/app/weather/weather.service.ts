import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { ICurrentWeather } from '../interface'
import { map } from 'rxjs/operators'
interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId)

    return this.httpClient.get<ICurrentWeather>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map(this.fun))
  }
  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather{
    const thing = {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahernheit(data.main.temp),
      description: data.weather[0].description,
    }
    console.log('at', thing)
    return thing
  }
  private convertKelvinToFahernheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
  private fun = (data) => {
    console.log(data)
    return this.transformToICurrentWeather(data);
  }
  something = function(data){
    console.log(data)
    return this.transformToICurrentWeather(data);
  }
}
