<template @resize="removemenu">
  <div class="hello"  @resize="removemenu">
  <div @click="removemenu" class="blur" id="blur"></div>
  <!-- <div @click="removemenu" class="blur2" id="blur2"></div>

  <div class="price">
    <h1 class="price">Prices</h1>
    <ol class="price">
      <li>Saden R60</li>
      <li>Single Cap van</li>
      <li>double Cap van</li>
      <li>Mini bus *Taxi</li>
    </ol>
  </div> -->
    <div class="navbar">
        <div class="container">
        <a class="logo" href="">Saki Booking</a>
            <img @click="addmenus"  class="mobile-menu" src="../assets/menu.svg" alt="Open Navigation">
            <nav id="mysidebar">
                <img @click="removemenu" id="mobile-exit" class="mobile-menu-exit" src="../assets/exit.svg" alt="Close Navigation">
                <ul class="primary-nav">
                  <li><a>{{signname}}</a></li>

                </ul>

                <ul class="secondary-nav">
                    <li id="homebooking" ><a  @click="history(2)">History</a></li>
                    <li id="infodata" style="display: none;"><a  @click="history(1)">Book</a></li>
                    <li class="go-premium-cta"><a @click="logout">Logout</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <section id="book" class="contact-section">
        <div class="container">
            <div class="contact-left">
                <h2>New Booking</h2>

                <form onsubmit="return false">
                  <div id="suggestions" class="suggestions">
                    <!--  <label for="name">Name</label>
                    <input type="text" v-model= "sugname" id="name" name="name" required oninvalid="this.setCustomValidity('Enter Name')" oninput="this.setCustomValidity('')"> -->

                    <!-- <label for="email">Email</label>
                    <input type="email" v-model= "sugemail" id="email" name="email" required oninvalid="this.setCustomValidity('Enter Valid Email')" oninput="this.setCustomValidity('')">
-->
                    <label for="message">Date</label>
                    <input  type= "date" id="myDate" v-model="date_" min="2022-11-26" max="2022-11-30" required pattern="\d{4}-\d{2}-\d{2}"> <br>

                    <label for="decription">Description</label>
                    <textarea style="resize: none;" name="decription" v-model= "Descrip" id="decription" cols="30" rows="10" required oninvalid="this.setCustomValidity('Enter Suggestion message')" oninput="this.setCustomValidity('')"></textarea>

                    <input id="sendesugg" @click="addbooking" type="button"  class="send-message-cta" value="Save" >
                  </div>
                </form>
            </div>
        </div>
    </section>
    <section id="book2" style="display: none;" class="hero2">
        <div class="container">
            <div class="left-col">
                <table>
                  <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                  <tr v-for="n in lim" :key= "n">
                    <td>{{BookingsArr[n-1]}}</td>
                    <td>{{BookingDates[n-1]}}</td>
                    <td><img @click="deleterecord(n-1)" height="40%" width="40%" src="../assets/icons8-trash-100.png" ></td>
                  </tr>
                </table>
            </div>
        </div>
    </section>
        <div class="feet">
    <h5 style="text-align:center">Copyright ?? 2022 All Rights Reserved. Designed by <a href="">Kabelo</a> </h5>
    </div>
  </div>
</template>

<script>
import acc from '../components/account.vue'
import swal from 'sweetalert'
export default {
  components: { 'acc-nt': acc },
  props: ['username', 'usersurname'],
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      file: '1111',
      sugname: '',
      sugemail: '',
      sugmessage: '',
      resultsFetched_3: '',
      atload: 0,
      nextpage: '',

      signname: '',
      signsurname: '',
      signemail: '',
      signplate: '',
      signcarname: '',
      totatwashcount: 0,
      washcount: 0,
      points: 0,

      date_: '',
      Descrip: '',
      resultsFetched_4: '',
      lim: 0,

      resultsFetched_5: '',
      BookingsArr: [],
      BookingDates: []

    }
  },

  unmounted () {
    window.removeEventListener('resize', this.removemenu)
  },
  methods: {
    deleterecord (n) {
      swal('Are you sure?', {
        buttons: {
          catch: {
            text: 'Delete',
            value: 'catch'
          },
          cancel: true
        },
        icon: 'warning'
      })
        .then(async (value) => {
          switch (value) {
            case 'catch':
              await fetch(`https://kabelodatabase.herokuapp.com/delete_booking/${this.BookingsArr[n]}/${this.BookingDates[n]}`)
              this.loadhistory()
              swal('', 'Record deleted!', 'success')
              break
            default:
              swal('Delete Cancelled', '', 'error')
          }
        })
    },
    async loadhistory () {
      await fetch(`https://kabelodatabase.herokuapp.com/get_all_booking`)
        .then(response => response.json())
        .then(results => (this.resultsFetched_5 = results))
      this.lim = this.resultsFetched_5.length
      for (let index = 0; index < this.lim; index++) {
        this.BookingsArr[index] = this.resultsFetched_5[index].description_
        this.BookingDates[index] = this.resultsFetched_5[index].date_
      }
    },
    history (n) {
      swal('Loading', '', 'success', {
        buttons: false,
        timer: 1000
      })
      this.removemenu()
      this.loadhistory()
      if (n === 1) {
        document.getElementById('book').style.display = 'inline'
        document.getElementById('book2').style.display = 'none'
        document.getElementById('homebooking').style.display = 'inline'
        document.getElementById('infodata').style.display = 'none'
      } else {
        document.getElementById('book').style.display = 'none'
        document.getElementById('book2').style.display = 'inline'
        document.getElementById('homebooking').style.display = 'none'
        document.getElementById('infodata').style.display = 'inline'
      }
    },
    async addbooking () {
      await fetch(`https://kabelodatabase.herokuapp.com/fn_add_booking/${this.Descrip}/${this.date_}/4`)
        .then(response => response.json())
        .then(results => (this.resultsFetched_4 = results))
      console.log(this.resultsFetched_4[0].fn_add_booking)
      if (this.resultsFetched_4[0].fn_add_booking > 1) {
        this.Descrip = ''
        this.date_ = ''
        swal('Booked', '', 'success', {
          buttons: false,
          timer: 3000
        })
      } else {
        swal('Booking already exist', '', 'error', {
          buttons: false,
          timer: 3000
        })
      }
    },
    checksession () {
      if (this.getCookie('usersaki') === 'none') {
        swal('', 'Session expired, login again', 'error', {
          buttons: false,
          timer: 3000
        })
        window.location.replace('https://travelsakireminder.web.app/#/login')
        // window.location.replace('http://localhost:8080/#/login')
      } else {
        const d = new Date()
        d.setTime(d.getTime() + (1 * 1 * 1 * 1 * 180000)) // session will expire after a minute
        // d.setUTCHours(0, 0, 0)
        let expires = 'expires=' + d.toUTCString()
        document.cookie = 'usersaki' + '=' + this.signname + ';' + expires + ';path=/'
        document.cookie = 'surnamesaki' + '=' + this.signsurname + ';' + expires + ';path=/'
        document.cookie = 'emailsaki' + '=' + this.signemail + ';' + expires + ';path=/'
      }
    },
    logout () {
      const d = new Date()
      d.setTime(d.getTime() - (1 * 1 * 1 * 1 * 180000)) // session will expire after a minute
      // d.setUTCHours(0, 0, 0)
      let expires = 'expires=' + d.toUTCString()
      document.cookie = 'usersaki' + '=' + this.signname + ';' + expires + ';path=/'
      document.cookie = 'surnamesaki' + '=' + this.signsurname + ';' + expires + ';path=/'
      document.cookie = 'emailsaki' + '=' + this.signemail + ';' + expires + ';path=/'
      // add procedure that add to log when one login
      // }
      // window.location.replace('http://localhost:8080')
      window.location.replace('https://travelsakireminder.web.app')
    },
    getCookie (cname) {
      let name = cname + '='
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return 'none'
    },
    toaccount () {
      this.checksession() // if cookies expired it logout
      // window.location.href = 'http://localhost:8080/#/account'
      // window.location.replace('https://brajoecarwash.co.za/#/account')
    },
    removemenu () {
      document.getElementById('blur').style.width = '0%'
      document.querySelector('nav').classList.remove('menu-btn')
    },
    addmenus () {
      document.querySelector('nav').classList.add('menu-btn')
      document.getElementById('blur').style.width = '100%'
    },
    async counts () {
      await fetch(`https://kabelodatabase.herokuapp.com/fn_add_load/saki`)
    },
    async login () {
      await fetch(`https://kabelodatabase.herokuapp.com/get_usernako/${this.signemail}`)
        .then(response => response.json())
        .then(results => (this.resultsFetched_3 = results))
      this.signname = this.resultsFetched_3[0].name_
      this.signsurname = this.resultsFetched_3[0].surname_
      var d = new Date()
      var dmax = new Date()
      d.setTime(d.getTime())
      dmax.setTime(dmax.getTime() + (90 * 24 * 60 * 60 * 1000))
      var month = d.getMonth() + 1
      var year = d.getFullYear()
      var day = d.getDate()

      var maxmonth = dmax.getMonth() + 1
      var maxyear = dmax.getFullYear()
      var maxday = dmax.getDate()

      if (month < 10) {
        if (day < 10) {
          document.getElementById('myDate').min = year + '-0' + month + '-0' + day
        } else {
          document.getElementById('myDate').min = year + '-0' + month + '-' + day
        }
      } else {
        if (day < 10) {
          document.getElementById('myDate').min = year + '-' + month + '-0' + day
        } else {
          document.getElementById('myDate').min = year + '-' + month + '-' + day
        }
      }

      if (maxmonth < 10) {
        if (maxday < 10) {
          document.getElementById('myDate').max = maxyear + '-0' + maxmonth + '-0' + maxday
        } else {
          document.getElementById('myDate').max = maxyear + '-0' + maxmonth + '-' + maxday
        }
      } else {
        if (maxday < 10) {
          document.getElementById('myDate').max = maxyear + '-' + maxmonth + '-0' + maxday
        } else {
          document.getElementById('myDate').max = maxyear + '-' + maxmonth + '-' + maxday
        }
      }
      // document.getElementById('myDate').value = document.getElementById('myDate').min
    }
  },
  mounted () {
    window.addEventListener('resize', this.removemenu)
    if (this.getCookie('usersaki') === 'none') {
      // alert('Session expired, login again')
      swal('', 'Session expired, login again', 'error', {
        buttons: false,
        timer: 3000
      })
      // window.location.replace('http://localhost:8080/#/login')
      window.location.replace('https://travelsakireminder.web.app') // 'http://localhost:8080/#/login'
    } else {
      this.signname = this.getCookie('usersaki')
      this.signsurname = this.getCookie('surnamesaki')
      this.signemail = this.getCookie('emailsaki')
      this.login()
    }
    // alert('welcome')
    // create a cookie that will help us coont number of page visits.
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
:root {
  --primary-color: #6d6c6c;
}
 .left-col blockquote {
  font-size: 1.2em;
  font-weight: bold;
  /* color: #31F300; */
}
.left-col cite {
   font-size: 1.0em;
}
body {
  background: #eee7e7;
  margin: 0;
  font-family: 'Poppins';
}

.navbar {
  background: white;
  padding: 1em;
}

.navbar .logo {
  text-decoration: none;
  font-weight: bold;
  color: black;
  font-size: 1.2em;
}

.navbar .logo span {
  color: var(--primary-color);
}

.navbar nav {
  display: none;
  transition: 0.5s;
}

.navbar .container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  place-content: space-between;
}

.navbar .mobile-menu {
  cursor: pointer;
}

a {
  color: #444444;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

section {
  padding: 5em 2em;
}

.heros {
  text-align: center;
      /* background:url('../assets/108487139-window-wash-1440.jpg'); */
      background-image-opacity: 0.2;
}

.left-col .subhead {
  text-transform: uppercase;
  font-weight: bold;
  color: gray;
  letter-spacing: .3em;
}

.left-col h1 {
  font-size: 2.5em;
  line-height: 1.3em;
  margin-top: .2em;
}

.left-col .primary-cta {
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: .6em 1.3em;
  font-size: 1.4em;
  border-radius: 5em;
  font-weight: bold;
  display: inline-block;
}

.left-col .watch-video-cta {
  display: block;
  margin-top: 1em;
}

.left-col .watch-video-cta img {
  margin-right: .5em;
}

.heros-img {
  width: 70%;
  margin-top: 3em;
}

section.features-section {
  background: #20272E;
  color: white;
}

ul.features-list {
  margin: 0;
  padding-left: .1em;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (minmax(19rem, 1fr))[auto-fit];
      grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
}

ul.features-list li {
  font-size: 1.1em;
  margin-bottom: 1em;
  margin-left: 2em;
  position: relative;
}

ul.features-list li:before {
  content: '';
  left: -2em;
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url("../assets/bullet.svg");
  background-size: contain;
  margin-right: .5em;
}

.features-section img {
  display: none;
}

.testimonials-section {
  background: var(--primary-color);
  color: white;
}

.testimonials-section li {
  background: #006BD6;
  text-align: center;
  padding: 2em 1em;
  width: 80%;
  margin: 0 auto 5em auto;
  border-radius: 1em;
}

.testimonials-section li img {
  width: 5em;
  height: 5em;
  border: 5px solid #006BD6;
  border-radius: 50%;
  margin-top: -4.5em;
}

h2 {
  font-size: 2em;
}

label {
  display: block;
  font-size: 1.2em;
  margin-bottom: .5em;
}

input, textarea {
  width: 100%;
  padding: .8em;
  margin-bottom: 1em;
  border-radius: .3em;
  border: 1px solid gray;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

input[type="button"] {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  font-size: 1.3em;
  border: none;
  margin-bottom: 5em;
  border-radius: 5em;
  display: inline-block;
  padding: .8em 2em;
  width: unset;
  cursor: pointer;
}

iframe {
  width: 100%;
  height: 300px;
}

nav.menu-btn {
  display: block;
}

nav {
  position: fixed;
  z-index: 999;
  width: 66%;
  right: 0;
  top: 0;
  background: #42333367;
  height: 100vh;
  padding: 1em;
}

nav ul.primary-nav {
  margin-top: 5em;
}

nav li a {
  color: white;
  text-decoration: none;
  display: block;
  padding: .5em;
  font-size: 1.3em;
  text-align: right;
}

nav li a:hover {
  font-weight: bold;
}

.mobile-menu-exit {
  float: right;
  margin: .5em;
  cursor: pointer;
}

@media only screen and (min-width: 768px) {
  .mobile-menu, .mobile-menu-exit {
    display: none;
  }
  .navbar .container {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 180px auto;
        grid-template-columns: 180px auto;
    -webkit-box-pack: unset;
        -ms-flex-pack: unset;
            justify-content: unset;
  }
  .navbar nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    background: none;
    position: unset;
    height: auto;
    width: 100%;
    padding: 0;
  }
  .navbar nav ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .navbar nav a {
    color: black;
    font-size: 1em;
    padding: .1em 1em;
  }
  .navbar nav ul.primary-nav {
    margin: 0;
  }
  .navbar nav li.current a {
    font-weight: bold;
  }
  .navbar nav li.go-premium-cta a {
    color: var(--primary-color);
    border: 3px solid var(--primary-color);
    font-weight: bold;
    border-radius: 5em;
    margin-top: -.2em;
  }
  .navbar nav li.go-premium-cta a:hover {
    background: var(--primary-color);
    color: white;
  }
}

@media only screen and (min-width: 1080px) {
  .container {
    width: 1080px;
    margin: 0 auto;
  }
  section {
    padding: 10em 4em;
  }
  .heros .container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    text-align: left;
  }
  .heros .container .left-col {
    margin: 3em 3em 0 5em;
    background: rgba(255, 255, 255, 0.05);
     backdrop-filter: blur(8px);
  }
  .heros .container .left-col h1 {
    font-size: 3em;
    width: 90%;
  }
  .heros-img {
    width: 30%;
    margin-right: 8em;
  }
  .heros-cta {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .primary-cta {
    margin-right: 1em;
  }
  ul.features-list {
    display: block;
    margin-left: 5em;
  }
  ul.features-list li {
    font-size: 1.4em;
  }
  ul.features-list li:before {
    width: 30px;
    height: 30px;
  }
  .features-section {
    position: relative;
  }
  .features-section img {
    display: block;
    position: absolute;
    right: 0;
    width: 350px;
    bottom: -2em;
  }
  .testimonials-section ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .testimonials-section ul li {
    margin: 0 1em;
  }
  .contact-section {
    position: relative;
  }
  .contact-section .container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .contact-right {
    position: absolute;
    right: 0;
    top: 0;
    width: 45%;
    height: 100%;
  }
  .contact-right iframe {
    height: 100%;
  }
}

@media only screen and (min-width: 1450px) {
  .features-section:before {
    content: '';
    position: absolute;
    width: 10%;
    height: 20em;
    background: var(--primary-color);
    left: 0;
    top: -4em;
  }
  .features-section:after {
    content: '';
    position: absolute;
    width: 200px;
    height: 20em;
    background: url("../assets/dots.svg") no-repeat;
    left: 4.5em;
    top: 2em;
  }
}

@media only screen and (max-width: 1450px) {
  .heros .container .left-col {
    border: 15px;
    margin: 0em 0em 0 0em;
    background: rgba(255, 255, 255, 0.05);
     backdrop-filter: blur(8px);
  }
}
  .blur {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  height: 100%;
  width: 0%;
  position: fixed;
  top:0 ;
  left: 0;
  overflow-x: visible;
  z-index: 3;
  transition: .8s;
}
  .blur2 {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  /* height: 75%; */
  position: fixed;
  top:25% ;
  left: 25%;
  right: 25%;
  bottom: 25%;
  overflow-x: visible;
  z-index: 3;
  transition: .8s;
}
.price {
  z-index: 3;
  position: fixed;
  left: 30%;
  top: 20%;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
    font-size: 16px;
  font-family: 'Indie Flower';
}

tr:nth-child(even) {
  background-color: #FFFFFF;
}
/*# sourceMappingURL=main.css.map */
</style>
