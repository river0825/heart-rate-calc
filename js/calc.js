/*第0級強度：D 熱身與技術區：~65% HRmax; ~59% HRR
第1級強度：E 有氧耐力區：65%~79% HRmax; 59~74% HRR
第2級強度：M 馬拉松配速區：79%~89% HRmax; 74~84% HRR
第3級強度：T 乳酸耐力區：89%~92% HRmax; 84~88% HRR
第4級強度：A 無氧耐力區：92%~97% HRmax; 88~95% HRR
第5級強度：I 最大耗氧區：97%~100% HRmax; 95%~100% HRR
第6級強度：R 爆發力與速度區：無須心率數據*/

$(document).ready(function() {
  $('.collapsible').collapsible();
  var vm = new Vue({
    el: '#vue-instance',
    data: {
      max: null,
      static: null,
      zone0: 0,
      zone1: 0,
      zone2: 0,
      zone3: 0,
      zone4: 0,
      zone5: 0,
      config: {
        z0: {
          rate: 0.59,
          caption: "第0級強度：D 熱身與技術區"
        },

        z1: {
          rate: 0.65,
          caption: "第1級強度：E 有氧耐力區"
        },
        z2: {
          rate: 0.8,
          caption: "第2級強度：M 馬拉松配速區"
        },
        z3: {
          rate: 0.88,
          caption: "第3級強度：T 乳酸耐力區"
        },
        z4: {
          rate: 0.92,
          caption: "第4級強度：A 無氧耐力區"
        },
        z5: {
          rate: 0.975,
          caption: "第5級強度：I 最大耗氧區"
        }
      }
    },
    methods: {
      setAlg: function(alg) {
        this.alg = alg;
        this.calculate();
      },
      calculate: function() {
        switch (this.alg) {
          case 'mhr':
            this.setHeartRate()
            break;
          case 'hhr':
            this.setHHRate();
          break
        default:
          this.setHeartRate()
          break
      }
    },
    setHeartRate: function() {
      this.zone0 = Math.round(this.max * this.config.z0.rate);
      this.zone1 = Math.round(this.max * this.config.z1.rate);
      this.zone2 = Math.round(this.max * this.config.z2.rate);
      this.zone3 = Math.round(this.max * this.config.z3.rate);
      this.zone4 = Math.round(this.max * this.config.z4.rate);
      this.zone5 = Math.round(this.max * this.config.z5.rate);
    },
    setHHRate: function() {
      this.zone0 = Math.round((this.max - this.static) * this.config.z0.rate) + this.static * 1;
      this.zone1 = Math.round((this.max - this.static) * this.config.z1.rate) + this.static * 1;
      this.zone2 = Math.round((this.max - this.static) * this.config.z2.rate) + this.static * 1;
      this.zone3 = Math.round((this.max - this.static) * this.config.z3.rate) + this.static * 1;
      this.zone4 = Math.round((this.max - this.static) * this.config.z4.rate) + this.static * 1;
      this.zone5 = Math.round((this.max - this.static) * this.config.z5.rate) + this.static * 1;
    }
  }
});
});
