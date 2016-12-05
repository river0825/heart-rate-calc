/*第0級強度：D 熱身與技術區：~65% HRmax; ~59% HRR
 第1級強度：E 有氧耐力區：65%~79% HRmax; 59~74% HRR
 第2級強度：M 馬拉松配速區：79%~89% HRmax; 74~84% HRR
 第3級強度：T 乳酸耐力區：89%~92% HRmax; 84~88% HRR
 第4級強度：A 無氧耐力區：92%~97% HRmax; 88~95% HRR
 第5級強度：I 最大耗氧區：97%~100% HRmax; 95%~100% HRR
 第6級強度：R 爆發力與速度區：無須心率數據*/

$(document).ready(function () {


    var vm = new Vue({
        el: '#vue-instance',
        data: {
            rows: [
                {'caption': '', 'mhr': 99, hhr: 38},
                {'caption': '', 'mhr': 99, hhr: 38},
                {'caption': '', 'mhr': 99, hhr: 38},
                {'caption': '', 'mhr': 99, hhr: 38},
                {'caption': '', 'mhr': 99, hhr: 38}
            ],
            config: {
                columns: {
                    caption: "說明",
                    percentage: "",
                    mhr: "mhr",
                    hhr: "hhr"
                },
                zones: {
                    z0: {"caption": "第0級強度：D 熱身與技術區", "short_caption": "D 熱身與技術區"},
                    z1: {"caption": "第1級強度：E 有氧耐力區", "short_caption": "E 有氧耐力區"},
                    z2: {"caption": "第2級強度：M 馬拉松配速區", "short_caption": "M 馬拉松配速區"},
                    z3: {"caption": "第3級強度：T 乳酸耐力區", "short_caption": "T 乳酸耐力區"},
                    z4: {"caption": "第4級強度：A 無氧耐力區", "short_caption": "A 無氧耐力區"},
                    z5: {"caption": "第5級強度：I 最大耗氧區", "short_caption": "I 最大耗氧區"}
                },
                def: {
                    caption: "default",
                    rates: {
                        z0: 0.65,
                        z1: 0.79,
                        z2: 0.89,
                        z3: 0.92,
                        z4: 0.97,
                        z5: 1
                    }
                }
            },
            values: {
                rateKey: 'def',
                heartRate: {
                    max: null,
                    static: null
                },
                customRates: [
                    {
                        caption: "z221",
                        rates: {
                            z0: 0.65,
                            z1: 0.79,
                            z2: 0.89,
                            z3: 0.92,
                            z4: 0.97,
                            z5: 1
                        }
                    },
                    {
                        caption: "x221",
                        rates: {
                            z0: 0.65,
                            z1: 0.79,
                            z2: 0.89,
                            z3: 0.92,
                            z4: 0.97,
                            z5: 1
                        }
                    },
                ]
            }
        },
        methods: {
            addRate: function () {
                if (!this.values.customRates) {
                    this.values.customRates = [];
                }

                this.values.customRates.push(
                    {
                        caption: "new rate",
                        rates: {
                            z0: 0.65,
                            z1: 0.79,
                            z2: 0.89,
                            z3: 0.92,
                            z4: 0.97,
                            z5: 1
                        }
                    }
                );
            },
            delRate: function (key) {
                var setting = this.values.customRates[key];
                var c = confirm("Delete " + setting.caption + "?");
                if (c) {
                    this.values.customRates.splice(key, 1);
                }

            },
            apply: function (key) {
                this.values.rateKey = key;
                this.calculate();
            },
            calculate: function () {
                pr_value = null
                this.rows = [];

                //get rate setting
                var rateSetting = this.values.customRates[this.values.rateKey];
                if (!rateSetting) {
                    rateSetting = this.config.def;
                }

                for (var k in this.config.zones) {
                    this.config.zones[k].rate = rateSetting.rates[k];

                    var cfg = this.config.zones[k];
                    var v = {}
                    var row = {}

                    v.rate = cfg.rate * 100 + "%";
                    v.mhr = Math.round(this.values.heartRate.max * cfg.rate);
                    v.hhr = Math.round((this.values.heartRate.max - this.values.heartRate.static) * cfg.rate) + this.values.heartRate.static * 1;

                    if (pr_value) {
                        row.caption = cfg.caption;
                        row.rate = pr_value.rate + " ~ " + v.rate;
                        row.mhr = pr_value.mhr + " ~ " + v.mhr;
                        row.hhr = pr_value.hhr + " ~ " + v.hhr;
                        this.rows.push(row);
                    }
                    pr_value = v;
                }
            }
        }
    });


    if (typeof(Storage) !== "undefined") {
        vm.$watch('values', function () {
            //save value
            var json = JSON.stringify(this.values);
            localStorage.setItem("values", json);
        }, {deep: true});

        //load values
        var values = localStorage.getItem("values");
        if (values) {
            vm.values = JSON.parse(values);
        }
    }

    vm.calculate();

    $('.collapsible').collapsible();
})
;
