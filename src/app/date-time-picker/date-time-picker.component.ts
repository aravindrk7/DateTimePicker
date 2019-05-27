import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { checkLeapYear } from './leapYearCheck';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  constructor() { }
  SelectedYear: any;
  SelectedMonth: any;
  SelectedMonthNumber: any;
  SelectedDay: any;
  SelectedHour: any;
  SelectedMinutes: any;
  SelectedSeconds: any;
  yearStartRange: any;
  yearEndRange: any;
  availableYears :any[];
  calenderStartDay :any;
  calenderStartMonth :any;
  calenderStartYear :any;
  availableDays:any;
  @ViewChild('yearMonthPicker') yearMonthPicker: ElementRef;
  @ViewChild('dayNameContainer') dayNameContainer: ElementRef;
  @ViewChild('dayContainer') dayContainer: ElementRef;
  @ViewChild('yearPicker') yearPicker: ElementRef;
  @ViewChild('monthContainer') monthContainer: ElementRef;
  @ViewChild('yearRangePicker') yearRangePicker: ElementRef;  
  @ViewChild('yearContainer') yearContainer: ElementRef;

  currentDate = new Date(); 
  availableMonths:any=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
  availableDaysName:any=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
  
  ngOnInit() {
    this.calenderStartDay = 1;
    this.calenderStartMonth = 'January';
    this.calenderStartYear = 1900;
    this.SelectedYear =this.currentDate.getFullYear();
    this.SelectedMonth = this.availableMonths[this.currentDate.getMonth()];
    this.SelectedDay = this.setDay(this.currentDate.getDate());
    this.SelectedHour = this.getHours(this.currentDate.getHours());
    this.SelectedMinutes = this.getMinutes(this.currentDate.getMinutes());
    this.SelectedSeconds = this.getSeconds(this.currentDate.getSeconds());
    this.availableYears =[];
    this.availableDays =[];
    this.getDays();
  }

  changeYear_Month(value){
    let currentIndex = this.availableMonths.indexOf(this.SelectedMonth);
    currentIndex += value;
    if(currentIndex == -1){
      this.SelectedYear--;
      currentIndex = 11;
    }
    else if(currentIndex == 12){
      this.SelectedYear++;
      currentIndex = 0;
    }
    this.SelectedMonth = this.availableMonths[currentIndex];
    this.getDays();
    this.setDay(1);
  }
  changeYear(value){
    this.SelectedYear += value;
  }
  showYears(){
    this.yearPicker.nativeElement.style.display = 'none';
    this.monthContainer.nativeElement.style.display = 'none';
    this.yearRangePicker.nativeElement.style.display = 'flex';
    this.yearContainer.nativeElement.style.display = 'grid';

    this.yearStartRange = this.SelectedYear-7;
    this.yearEndRange = this.SelectedYear+8;
    this.calculateYears();
  }
  showMonths(){
    this.yearMonthPicker.nativeElement.style.display = 'none';
    this.dayNameContainer.nativeElement.style.display = 'none';
    this.dayContainer.nativeElement.style.display = 'none';
    this.yearPicker.nativeElement.style.display = 'flex';
    this.monthContainer.nativeElement.style.display = 'grid';
  }
  setMonth(month){
    this.SelectedMonth = month;
    this.yearMonthPicker.nativeElement.style.display = 'flex';
    this.dayNameContainer.nativeElement.style.display = 'flex';
    this.dayContainer.nativeElement.style.display = 'grid';
    this.yearPicker.nativeElement.style.display = 'none';
    this.monthContainer.nativeElement.style.display = 'none';
    this.getDays();
    this.setDay(1);

  }
  setDay(day){
    this.SelectedDay = day;
    if(this.SelectedDay>=0 && this.SelectedDay<=9){
      this.SelectedDay = '0'+this.SelectedDay;
    }
    return this.SelectedDay;
  }
  setYear(year){
    this.SelectedYear = year;
    this.yearPicker.nativeElement.style.display = 'flex';
    this.monthContainer.nativeElement.style.display = 'grid';
    this.yearRangePicker.nativeElement.style.display = 'none';
    this.yearContainer.nativeElement.style.display = 'none';
  }

  changeHour(value){
    this.SelectedHour = Number(this.SelectedHour)+ value;
    this.SelectedHour = this.getHours(this.SelectedHour);
  }
  getHours(hours){
    if(hours == 24){
      hours = 0;
    }
    else if(hours == -1){
      hours = 23;
    }
    if(hours>=0 && hours<=9){
      hours = '0'+hours;
    }
    return hours;
  }
  changeMinutes(value){
    this.SelectedMinutes =Number(this.SelectedMinutes) + value;
    this.SelectedMinutes = this.getMinutes(this.SelectedMinutes);
  }
  getMinutes(minutes){
    if(minutes == 60){
      minutes = 0;
    }
    else if(minutes == -1){
      minutes = 59;
    }
    if(minutes>=0 && minutes<=9){
      minutes = '0'+minutes;
    }
    return minutes;
  }
  changeSeconds(value){
    this.SelectedSeconds =Number(this.SelectedSeconds)+ value;
    this.SelectedSeconds= this.getSeconds(this.SelectedSeconds);
  }
  getSeconds(seconds){
    if(seconds == 60){
      seconds = 0;
    }
    else if(seconds == -1){
      seconds= 59;
    }
    if(seconds>=0 && seconds<=9){
      seconds = '0'+seconds;
    }
    return seconds;
  }
  changeYearRange(value){
    this.yearStartRange = this.yearStartRange+value;
    this.yearEndRange = this.yearEndRange+value;
    this.calculateYears();
  }
  calculateYears(){
    this.availableYears = [];
    for(let i=this.yearStartRange;i<=this.yearEndRange;i++){
      this.availableYears.push(i);
    }
  }

  getDays(){
    let totalDays = 0;
    this.availableDays=[];
    for(let year=1900;year<this.SelectedYear;year++){
      totalDays += checkLeapYear(year)?366:365;
    }

    for(let monthIndex=0;monthIndex<this.availableMonths.indexOf(this.SelectedMonth);monthIndex++){
      totalDays += this.getTotalDaysInMonth(monthIndex);
  }
    this.availableDays[this.availableDaysName.indexOf(this.getDayName(++totalDays))] = 1;
  for(let i=2;i<=this.getTotalDaysInMonth(this.availableMonths.indexOf(this.SelectedMonth));i++){
    this.availableDays.push(i);
  }
  }

  getDayName(totalDays){
    if(totalDays%7==0){
      return 'Sunday';
    }
    else if(totalDays%7==1){
      return 'Monday';
    }
    else if(totalDays%7==2){
      return 'Tuesday';
    }
    else if(totalDays%7==3){
      return 'Wednesday';
    }
    else if(totalDays%7==4){
      return 'Thursday';
    }
    else if(totalDays%7==5){
      return 'Friday';
    }
    else{
      return 'Saturday';
    }
  }

  getTotalDaysInMonth(monthIndex){
    if(monthIndex == 0 || monthIndex == 2 || monthIndex == 4 || monthIndex == 6 || monthIndex == 7 || monthIndex == 9|| monthIndex == 11){
      return 31;
    }
    else if(monthIndex ==1){
      if(checkLeapYear(this.SelectedYear)){
          return 29;
      }
      else{
        return 28;
      }
    }
    else{
      return 30;
    }
  }

  highlightSelectedElement(value,clickedvalue){
    if(value == clickedvalue){
          return true;
        }
        else{
          return false;
        }
  }
  // highlightSelectedMonth(month){
  //   if(this.SelectedMonth == month){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  // highlightSelectedYear(year){
  //   if(this.SelectedYear == year){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  highlightSelectedDay(day){
    if(this.SelectedDay == day && day !=null){
      return true;
    }
    else{
      return false;
    }
  }
  disableSelectedDay(day){
    if(day !=null){
      return false;
    }
    else{
      return true;
    }
  }
  getSlicedSelectedYear(){
    let slicedYear = this.SelectedYear+"";
    return slicedYear.slice(slicedYear.length-2,slicedYear.length);
  }
  getSelectedMonthNumber(){
    let monthNum = this.availableMonths.indexOf(this.SelectedMonth) + 1;
    if(monthNum>=0 && monthNum<=9){
      monthNum = '0'+monthNum;
    }
    return monthNum;
  }
  setFinalDateTime(){
    console.log(this.parsedDate()+"T"+this.getFinalTime());
  }
  getFinalTime(){
    return this.SelectedHour + ":" + this.SelectedMinutes + ":" + this.SelectedSeconds;
  }
  getFinalDate(){
    return this.SelectedYear +", "+ this.SelectedMonth +" "+ this.SelectedDay
  }
  parsedDate(){
    return this.getSlicedSelectedYear()+"-"+this.getSelectedMonthNumber()+"-"+this.SelectedDay;
  }
}
