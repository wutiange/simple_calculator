class SimpleCalculator {
    ch = [];
    digit = [];


    startCalc(str = "") {
        let list = this.readStr(str);
        list.forEach((s) => {
            if (s === "+" || s === "-" || s === "*" || s === "/" || s === "%" || s === "÷" || s === "×") {
                this.priority(s);
                this.ch.push(s);
            } else {
                this.digit.push(parseFloat(s));
            }
        })
        while (this.ch.length !== 0) {
            let c = this.ch.pop();
            let b = this.digit.pop();
            let a = this.digit.pop();
            this.digit.push(this.calc(a - 0, c, b - 0));
        }
        return this.digit.pop();
    }

    // 读取最长字符
    readStr(str = "") {
        let a = [];
        let s = "";
        /*
         * -1 啥也不是
         * 1 是数字
         * 2 是运算符
         * 3 正负数
         */
        let type = -1;
        for (let i = 0; i < str.length; i ++) {
            switch (str.charAt(i)) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    // 不能是本身，不能是正负号，不能是第一次
                    if (type != 1 && type != -1 && type != 3) {
                        a.push(s)
                        s = ""
                    }
                    type = 1;
                    s += str.charAt(i)
                    break;
                case '.':
                    // 如果出现了 . ，看看后面的是不是数字，如果不是直接报错
                    if (i + 1 < str.length && str.charAt(i + 1) >= '0' && str.charAt(i + 1) <= '9') {
                        if (type != 1 && type != -1 && type != 3) {
                            a.push(s)
                            s = ""
                        }
                        type = 1;
                        s += str.charAt(i)
                    } else {
                        console.error("ERROR");
                    }
                    break;
                case '+':
                case '-':
                    if (i + 1 >= str.length) {
                        console.error("ERROR");
                    }
                    // 只要不是 -1 都保存起来
                    if (type != -1) {
                        a.push(s);
                        s = ""
                    }
                    // 只要当第一次或者已经出现过运算符了才将 type 置为 3
                    if (type == 2 || type == -1) {
                        type = 3;
                    } else {
                        type = 2;
                    }
                    s += str.charAt(i)
                    break;
                case '*':
                case '/':
                case '%':
                case '×':
                case '÷':
                    // 不能第一次就出现这三个运算符和最后一次出现
                    if (type == -1 || i + 1 >= str.length) {
                        console.error("ERROR");
                    }
                    if (type != 2) {
                        a.push(s);
                        s = ""
                    }
                    type = 2;
                    s += str.charAt(i)
                    break;
            }
        }
        a.push(s);
        return a;
    }

    // 获取操作符号的优先级
    operationGrade(ope = "") {
        switch (ope) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
            case "%":
            case "×":
            case "÷":
                return 2;
            default:
                return 0;
        }
    }

    // 根据符号进行计算
    calc(a = 0, ope = "", b = 0) {
        switch (ope) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
            case "×":
                return a * b;
            case "/":
            case "÷":
                return a / b;
            case "%":
                return a % b;
            default:
                return 0;
        }
    }

    // 需要递归看优先级，直到优先级当前低或者只剩下自己
    priority(s = "") {
        if (this.ch.length !== 0) {
            let c = this.ch.pop();
            let cG = this.operationGrade(c);
            let sG = this.operationGrade(s);
            if (cG >= sG) {
                let b = this.digit.pop();
                let a = this.digit.pop();
                this.digit.push(this.calc(a - 0, c, b - 0));
                this.priority(s);
            } else {
                this.ch.push(c);
            }
        }
    }
}

module.exports = {
    SimpleCalculator
}
  