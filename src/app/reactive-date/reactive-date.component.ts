import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-reactive-date",
  templateUrl: "./reactive-date.component.html",
  styleUrls: ["./reactive-date.component.scss"]
})
export class ReactiveDateComponent implements OnInit {
  @Input() formReactDate: FormGroup;
  inputWidth;
  constructor() {}

  ngOnInit() {}

  // Enter a valid date
  setFomatDate(e): void {
    var input = e.target.value;
    const matchDigit = /\D\/$/.test(input);
    if (matchDigit) {
      input = input.substr(0, input.length - 3);
    }
    var values = this.removeSpace(input); // remove space previous day, month, year
    this.checkDayandMonthHasValid(values); // check day and month that the users entered is valid.
    e.target.value = this.addSeparator(values); // Add separator to valid date format, e.g: 03/02/1997
  }

  // Show date when users click elsewhere
  showDateValid(e): void {
    var input = e.target.value;
    var values = this.removeSpace(input); // remove space previous day, month, year
    var output = "";
    if (values.length === 3) {
      var year =
        values[2].length !== 4
          ? parseInt(values[2]) + 2000
          : parseInt(values[2]);
      var month = parseInt(values[0]) - 1;
      var day = parseInt(values[1]);
      output = this.fomatDateValid(year, month, day); // fomat date valid when users click elsewhere
    }
    e.target.value = output;
  }

  // Set 'input' cell width based on value length that the user entered.
  setWidthInput(e): void {
    var value = e.target.value;
    if (value.length === 1) {
      this.inputWidth = 24;
    } else if (value.length === 2) {
      this.inputWidth = 60;
    } else if (value.length === 5) {
      this.inputWidth = 67;
    } else if (value.length === 6) {
      this.inputWidth = 90;
    } else if (value.length === 7) {
      this.inputWidth = 120;
    } else if (value.length === 10) {
      this.inputWidth = 119;
    } else if (value.length === 11) {
      this.inputWidth = 146;
    } else if (value.length === 12) {
      this.inputWidth = 167;
    } else if (value.length === 13) {
      this.inputWidth = 187;
    } else if (value.length === 14) {
      this.inputWidth = 210;
    }
  }

  // ** Functions for 'setFomatDate' **
  private checkDayandMonthHasValid(values) {
    if (values[0]) {
      values[0] = this.checkValue(values[0], 12);
    }
    if (values[1]) {
      values[1] = this.checkValue(values[1], 31);
    }
  }

  private addSeparator(values) {
    var output = values.map((v, i) => {
      return v.length === 2 && i < 2 ? v + " / " : v;
    });

    var op = output.join("").substr(0, 14);
    return op;
  }

  // ** Functions for 'showDateValid' **
  private removeSpace(input) {
    return input.split("/").map((v, i) => {
      return v.replace(/\D/g, "");
    });
  }

  private fomatDateValid(year, month, day) {
    var d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      // document.getElementById("result").innerHTML = d.toString();
      var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
      return dates
        .map(v => {
          return v.toString().length === 1 ? "0" + v : v;
        })
        .join(" / ");
    }
  }

  // Check day and month that the users entered has valid ko?
  private checkValue(str, max): string {
    if (str.charAt(0) !== "0" || str === "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) {
        num = 1;
      }
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length === 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }
}
