function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    }
  },
  watch: {
    monsterHealth(value) {
      if(value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if(value <= 0) {
        this.winner = 'player';
      }
    },
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster'
      }
    }
  },
  computed: {
    monsterHealthBar() {
      if(this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      return {width: this.monsterHealth + '%'}
    },
    playerHealthBar() {
      if(this.playerHealth < 0) {
        this.playerHealth = 0
      } else if (this.playerHealth > 100) {
        this.playerHealth = 100
      }
      return {width: this.playerHealth + '%'}
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    disableHealPlayer() {
      return this.currentRound % 2 !== 0;
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++
      // const interval = this.round = this.round + 1
      const randomValue = randomNumber(8, 15);
      this.monsterHealth = this.monsterHealth - randomValue;
      this.addLogMessages('player', 'attack', randomValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const randomValue = randomNumber(10, 17);
      this.playerHealth = this.playerHealth - randomValue;
      this.addLogMessages('monster', 'attack', randomValue);
    },
    specialAttackMonster() {
      this.currentRound++
      const randomValue = randomNumber(11, 18);
      this.monsterHealth = this.monsterHealth - randomValue;
      this.addLogMessages('player', 'attack', randomValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++
      const randomValue = randomNumber(12, 19);
      this.playerHealth = this.playerHealth + randomValue;
      this.addLogMessages('player', 'heal', randomValue);
      this.attackPlayer();
    },
    startNewGame() {
      this.monsterHealth = 100,
      this.playerHealth = 100,
      this.currentRound = 0,
      this.winner = null,
      this.logMessages = []
    },
    surrenderGame() {
      this.winner = 'monster';
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  }
});

app.mount('#game')