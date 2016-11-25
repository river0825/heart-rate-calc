/*第0級強度：D 熱身與技術區：~65% HRmax; ~59% HRR
 第1級強度：E 有氧耐力區：65%~79% HRmax; 59~74% HRR
 第2級強度：M 馬拉松配速區：79%~89% HRmax; 74~84% HRR
 第3級強度：T 乳酸耐力區：89%~92% HRmax; 84~88% HRR
 第4級強度：A 無氧耐力區：92%~97% HRmax; 88~95% HRR
 第5級強度：I 最大耗氧區：97%~100% HRmax; 95%~100% HRR
 第6級強度：R 爆發力與速度區：無須心率數據*/

$(document).ready(function () {
    $('.collapsible').collapsible();
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
                    "caption": "說明",
                    "percentage": "",
                    "mhr": "mhr",
                    "hhr": "hhr"
                },
                zones: {
                    z0: {"caption": "第0級強度：D 熱身與技術區", "short_caption": "D 熱身與技術區"},
                    z1: {"caption": "第1級強度：E 有氧耐力區", "short_caption": "E 有氧耐力區"},
                    z2: {"caption": "第2級強度：M 馬拉松配速區", "short_caption": "M 馬拉松配速區"},
                    z3: {"caption": "第3級強度：T 乳酸耐力區", "short_caption": "T 乳酸耐力區"},
                    z4: {"caption": "第4級強度：A 無氧耐力區", "short_caption": "A 無氧耐力區"},
                    z5: {"caption": "第5級強度：I 最大耗氧區", "short_caption": "I 最大耗氧區"}
                },
                "default": {
                    "caption": "default",
                    "rates": [
                        0.65,
                        0.79,
                        0.89,
                        0.92,
                        0.97,
                        1
                    ]
                }
            },
            values: {
                heartRate: {
                    max: null,
                    static: null
                },
                zones: {}
            }
        },
        methods: {
            calculate: function () {
                this.rows = [];

                var i = 0;
                for (var k in this.config.zones) {
                    this.config.zones[k].rate = this.config.default.rates[i];

                    var cfg = this.config.zones[k];
                    var row = {};

                    row.caption = cfg.caption;
                    row.rate = cfg.rate * 100 + "%";
                    row.mhr = Math.round(this.values.heartRate.max * cfg.rate);
                    row.hhr = Math.round((this.values.heartRate.max - this.values.heartRate.static) * cfg.rate) + this.values.heartRate.static * 1;

                    this.rows.push(row);
                    i++;
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
})
;
