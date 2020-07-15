import { TestBed, async } from '@angular/core/testing'

import { AppComponent } from './app.component'
// import { CurrentWeatherComponent } from './current-weather/current-weather.component'
// import { HttpClient, HttpHandler } from '@angular/common/http'
// import { HttpClientTestingModule } from '@angular/common/http/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, createComponentMock('CurrentWeatherComponent')],
      // imports: [HttpClientTestingModule],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('LocalCast Weather')
  })
})
