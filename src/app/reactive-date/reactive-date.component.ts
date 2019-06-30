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

  checkBlur(e): void {
    console.log(e);
    var input = e.target.value;
    var values = input.split("/").map(function(v, i) {
      return v.replace(/\D/g, "");
    });
    var output = "";
    if (values.length === 3) {
      var year =
        values[2].length !== 4
          ? parseInt(values[2]) + 2000
          : parseInt(values[2]);
      var month = parseInt(values[0]) - 1;
      var day = parseInt(values[1]);
      var d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        // document.getElementById("result").innerHTML = d.toString();
        var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
        output = dates
          .map(function(v) {
            return v.toString().length === 1 ? "0" + v : v;
          })
          .join(" / ");
      }
    }
    e.target.value = output;
  }

  checkInput(e): void {
    console.log(e.target.value);
    var input = e.target.value;
    if (/\D\/$/.test(input)) {
      input = input.substr(0, input.length - 3);
    }
    var values = input.split("/").map(function(v) {
      return v.replace(/\D/g, "");
    });
    if (values[0]) {
      values[0] = this.checkValue(values[0], 12);
    }
    if (values[1]) {
      values[1] = this.checkValue(values[1], 31);
    }

    var output = values.map(function(v, i) {
      return v.length === 2 && i < 2 ? v + " / " : v;
    });
    e.target.value = output.join("").substr(0, 14);
  }

  keyup(e): void {
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const
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

  checkValue(str, max): string {
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
