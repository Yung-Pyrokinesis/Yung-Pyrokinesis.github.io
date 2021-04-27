let ctx = document.getElementById('sirGraph').getContext('2d');
let chart = new Chart(ctx, {
// Тип графика
type: 'line',
 
// Создание графиков
data: {
    // Точки графиков
    labels: [],
    // График
    datasets: [{
        label: '(S) - Здорових', // Название Suseptible
        backgroundColor: 'rgba(0 ,191 ,255, 0.1)', // Цвет закраски
        borderColor: 'rgb(0 ,191 ,255)', // Цвет линии
        data: [] // Данные каждой точки графика
    },
    {
        label: '(I) - Інфікованих', // Название Infected
        backgroundColor: 'rgba(220 ,20 ,60, 0.1)', // Цвет закраски
        borderColor: 'rgb(220 ,20 ,60)', // Цвет линии
        data: [] // Данные каждой точки графика
    },
    {
        label: '(R) - Одужали і мають імунітет', // Название Recovered
        backgroundColor: 'rgba(34, 139, 34, 0.1)', // Цвет закраски
        borderColor: 'rgb(34, 139, 34)', // Цвет линии
        data: [] // Данные каждой точки графика
    }]
},
 
// Настройки графиков
options: {}
});

function sirModel() { 

    let days = +document.querySelector('.days').value;
    let beta = +document.querySelector('.beta').value;
    let gamma = +document.querySelector('.gamma').value;
    let N = +document.querySelector('.population').value;

    document.querySelector('.gamma-coef').textContent = gamma;
    document.querySelector('.beta-coef').textContent = beta;

    let sus = [];
    let inf = [];
    let rec = [];
    let day = [];

    let I0, S0, R0, I, S, R;

    // початкові значення , в нульовий момент часу
    I0 = 1;
    S0 = N - I0;
    R0 = 0;
    
    sus.push(S0);
    inf.push(I0);
    rec.push(R0);
    day.push(0);
  
    for (let k = 0; k < days; k++) {
      for (let j = 0; j < 5; j++) {
        S = S0 - (beta * I0 * S0) / N;
        I = I0 + (beta * I0 * S0) / N - gamma * I0;
        R = R0 + gamma * I0;
  
        S0 = S;
        I0 = I;
        R0 = R;
      }
      sus.push(S0);
      inf.push(I0);
      rec.push(R0);
      day.push(k*5);
      //console.log(S0,I0,R0);
    }
    chart.data.datasets['0']["data"] = sus;
    chart.data.datasets['1']["data"] = inf;
    chart.data.datasets['2']["data"] = rec;
    chart.data.labels = day;
    //console.log(S0,I0,R0);
    chart.update();
  }

  let ctx1 = document.getElementById('seirGraph').getContext('2d');
  let chart1 = new Chart(ctx1, {
  // Тип графика
  type: 'line',
   
  // Создание графиков
  data: {
      // Точки графиков
      labels: [],
      // График
      datasets: [{
          label: '(S)Здорових', // Название Suseptible
          backgroundColor: 'rgba(0 ,191 ,255, 0.1)', // Цвет закраски
          borderColor: 'rgb(0 ,191 ,255)', // Цвет линии
          data: [] // Данные каждой точки графика
      },
      {
         label: '(E)Знаходяться в інкубаційному періоді', // Название Exposed
         backgroundColor: 'rgba(255,230,50, 0.1)', // Цвет закраски
         borderColor: 'rgb(255,230,51)', // Цвет линии
         data: [] // Данные каждой точки графика
     },
     {
          label: '(I)Інфікованих', // Название Infected
          backgroundColor: 'rgba(220 ,20 ,60, 0.1)', // Цвет закраски
          borderColor: 'rgb(220 ,20 ,60)', // Цвет линии
          data: [] // Данные каждой точки графика
      },
      {
          label: '(R)Одужали і мають імунітет', // Название Recovered
          backgroundColor: 'rgba(34, 139, 34, 0.1)', // Цвет закраски
          borderColor: 'rgb(34, 139, 34)', // Цвет линии
          data: [] // Данные каждой точки графика
      },
      {
         label: '(D)Померло', // Название Recovered
         backgroundColor: 'rgba(25, 25, 25, 0.1)', // Цвет закраски
         borderColor: 'rgb(25, 25, 25)', // Цвет линии
         data: [] // Данные каждой точки графика
     }]
  },
   
  // Настройки графиков
  options: {}
  });

  function seirModel() { 

   let days = +document.querySelector('.daysseir').value;
   let beta = +document.querySelector('.betaseir').value;
   let gamma = +document.querySelector('.gammaseir').value;
   let alpha = +document.querySelector('.alphaseir').value;
   let mu = +document.querySelector('.museir').value;
   let N = +document.querySelector('.populationseir').value;

   document.querySelector('.gamma-coef-seir').textContent = gamma;
   document.querySelector('.beta-coef-seir').textContent = beta;
   document.querySelector('.alpha-coef-seir').textContent = alpha;
   document.querySelector('.mu-coef-seir').textContent = mu;

   let sus = [];
   let inf = [];
   let rec = [];
   let exp = [];
   let dead = [];
   let day = [];
   //console.log(beta,gamma,alpha,mu);
   let I0, S0, R0, E0, D0, I, S, R, E, D;

   // початкові значення , в нульовий момент часу
   I0 = 1;
   S0 = N - I0;
   R0 = 0;
   E0 = 1;
   D0 = 0;

   sus.push(S0);
   inf.push(I0);
   rec.push(R0);
   exp.push(E0);
   dead.push(D0);
   day.push(0);
 
   for (let k = 0; k < days; k++) {
     for (let j = 0; j < 5; j++) {
      S = S0 - (beta * I0 * S0) / N - mu * S0;
      E = E0 + (beta * I0 * S0) / N - (mu + alpha) * E0;
      I = I0 + alpha * E0 - (gamma + mu) * I0;
      R = R0 + gamma * I0 - mu * R0;
      D = D0 + mu * S0 + mu * E0 + mu * I0 + mu * R0;
      S0 = S;
      I0 = I;
      R0 = R;
      E0 = E;
      D0 = D;
     }
     sus.push(S0);
     inf.push(I0);
     rec.push(R0);
     exp.push(E0);
     dead.push(D0);
     day.push(k*5);
   }
   chart1.data.datasets['0']["data"] = sus;
   chart1.data.datasets['1']["data"] = exp;
   chart1.data.datasets['2']["data"] = inf;
   chart1.data.datasets['3']["data"] = rec;
   chart1.data.datasets['4']["data"] = dead;
   chart1.data.labels = day;
   //console.log(S0,I0,R0);
   chart1.update();
 }

document.addEventListener("DOMContentLoaded", () => {
   sirModel();
   seirModel();
});

myRangeBeta.oninput = sirModel;
myRangeGamma.oninput = sirModel;
population.oninput = sirModel;
daysSir.onchange = sirModel;

myRangeAlphaSeir.oninput = seirModel;
myRangeMuSeir.oninput = seirModel;
myRangeBetaSeir.oninput = seirModel;
myRangeGammaSeir.oninput = seirModel;
populationSeir.oninput = seirModel;
daysSeir.onchange = seirModel;

function Construct1(){
  let widthHeight = 25;
  let classAdd = 'pixel1';
  let val = +document.querySelector('.net-epidem').value;
  let flex = document.querySelector('.flex');
  flex.innerHTML = '';

  if(val == 30){ 
    widthHeight = 20;
    classAdd = 'pixel2';
  }
  if(val == 40){ 
    widthHeight = 15;
    classAdd = 'pixel3';
  }
  if(val == 50){ 
    widthHeight = 10;
    classAdd = 'pixel4';
  }
  flex.style.width = val*widthHeight+'px';
  flex.style.height = val*widthHeight+'px';

  let div = '';
  for(let i = 1; i <= val*val; i++){
    div = document.createElement('div');
    div.classList.add(classAdd);
    div.classList.add(`div-${i}`);
    document.querySelector('.flex').appendChild(div);

  }
}
function Construct() {
  let widthHeight = 25;
  let classAdd = 'pixel1';
  let val = +document.querySelector('.net-epidem').value;
  let flex = document.querySelector('.flex');
  flex.innerHTML = '';

  if(val == 30){ 
    widthHeight = 20;
    classAdd = 'pixel2';
  }
  if(val == 40){ 
    widthHeight = 15;
    classAdd = 'pixel3';
  }
  if(val == 50){ 
    widthHeight = 10;
    classAdd = 'pixel4';
  }
  flex.style.width = val*widthHeight+'px';
  flex.style.height = val*widthHeight+'px';

  let div = '';
  for(let i = 1; i <= val*val; i++){
    div = document.createElement('div');
    div.classList.add(classAdd);
    div.classList.add(`div-${i}`);
    document.querySelector('.flex').appendChild(div);

  }
  workPixel();
} 
function workPixel() {
  let time = +document.querySelector('#timeEpidem').value;
  let infek = +document.querySelector('#infekEpidem').value;
  let incub = +document.querySelector('#incubEpidem').value;
  let here = +document.querySelector('#hereEpidem').value;
  let days = 0;
  let I0 = 1;
  let population = +document.querySelector('#popEpidem').value;
  let width = +document.querySelector('.net-epidem').value;
  let square = +document.querySelector('.net-epidem').value;
  let flag = true;
  square*=square;
  let ra = randomPixel(square);
  let arr = Array({
    color: 'red',
    day: time,
    incub: incub,
    position: ra
  });

  let div = document.querySelector(`.div-${ra}`);
  div.style.backgroundColor = 'red';

    for(let i = 1; i < population; i++){
      ra = randomPixel(square);
      while(document.querySelector(`.div-${ra}`).style.backgroundColor !== '')
        ra = randomPixel(square);
      document.querySelector(`.div-${ra}`).style.backgroundColor = 'blue';
        arr.push({
        color: 'blue',
        day: 0,
        incub: 0,
        position: ra
      });
    }
    let timerId = setInterval(() => {
    days++;
    for(let i = 0; i < population; i++){
      if(arr[i].color == 'red'){
        arr[i].day -= 1;
        if(arr[i].incub != 0){
          console.log('incub!=0');
          arr[i].incub -=1;
          continue;
        }
        if(arr[i].day == 0){
          console.log('day=0');
          arr[i].color = 'green';
          continue;
        }
              
        let f = infek;
        for(let j = 0; j < population; j++){
          if((arr[i].position-1 == arr[j].position || 
            arr[i].position+1 == arr[j].position || 
            arr[i].position+width == arr[j].position || 
            arr[i].position-width == arr[j].position || 
            arr[i].position+1+width == arr[j].position || 
            arr[i].position-1+width == arr[j].position ||
            arr[i].position-1-width == arr[j].position || 
            arr[i].position+1-width == arr[j].position) 
            && arr[j].color == 'blue')  {
              arr[j].color = 'red';
              arr[j].day = time;
              arr[j].incub = incub;
              f--;
          }
         if(f==0) continue;
        }
        console.log(arr);
      }
    }
      Construct1();
      for(let i = 0; i < population; i++){
        if(randomPixel(100) > here){
          let ra = randomPixel(square);
          while(document.querySelector(`.div-${ra}`).style.backgroundColor != '')
            ra = randomPixel(square);
            document.querySelector(`.div-${ra}`).style.backgroundColor = arr[i].color;
            arr[i].position = ra;
        }else{
          document.querySelector(`.div-${arr[i].position}`).style.backgroundColor = arr[i].color;
        }
      }
      if(days%5 == 0) {
        let se = 0, ie = 0, re = 0;
        for(let i = 0; i < population; i++){
          if(arr[i].color == 'blue') se++;
          if(arr[i].color == 'red') ie++;
          if(arr[i].color == 'green') re++;
        }
        chart2.data.datasets['0']["data"].push(se);
        chart2.data.datasets['1']["data"].push(ie);
        chart2.data.datasets['2']["data"].push(re);
        chart2.data.labels.push(days);
        chart2.update();
      }
      let r = 0;
      for(let i = 0; i < population; i++)
        if(arr[i].color == 'red') r++;
      if(r == 0) clearInterval(timerId);
      document.querySelector('.btn-epidem-stop').onclick = function() {
        clearInterval(timerId);
        Construct1();
      };
    }, 600);
}
document.querySelector('.btn-epidem').onclick = function(){
  Construct();
  chart2.data.datasets['0']["data"] = [];
  chart2.data.datasets['1']["data"] = [];
  chart2.data.datasets['2']["data"] = [];
  chart2.data.labels = [];
  chart2.update();
}
function randomPixel(rand) {
  return Math.floor(Math.random() * rand) + 1; // returns a random integer from 1 to 100
}
function res() {
  document.querySelector('.popSpan').textContent = document.querySelector('#popEpidem').value;
  document.querySelector('.timeSpan').textContent = document.querySelector('#timeEpidem').value;
  document.querySelector('.infekSpan').textContent = document.querySelector('#infekEpidem').value;
  document.querySelector('.incubSpan').textContent = document.querySelector('#incubEpidem').value;
  document.querySelector('.hereSpan').textContent = document.querySelector('#hereEpidem').value;
}
popEpidem.oninput = res;
timeEpidem.oninput = res;
infekEpidem.oninput = res;
incubEpidem.oninput = res;
hereEpidem.oninput = res;

let ctx2 = document.getElementById('simGraph').getContext('2d');
let chart2 = new Chart(ctx2, {
// Тип графика
type: 'line',
 
// Создание графиков
data: {
    // Точки графиков
    labels: [],
    // График
    datasets: [{
        label: '(S)Здорових', // Название Suseptible
        backgroundColor: 'rgba(0 ,191 ,255, 0.1)', // Цвет закраски
        borderColor: 'rgb(0 ,191 ,255)', // Цвет линии
        data: [] // Данные каждой точки графика
    },
   {
        label: '(I)Інфікованих', // Название Infected
        backgroundColor: 'rgba(220 ,20 ,60, 0.1)', // Цвет закраски
        borderColor: 'rgb(220 ,20 ,60)', // Цвет линии
        data: [] // Данные каждой точки графика
    },
    {
        label: '(R)Одужали і мають імунітет', // Название Recovered
        backgroundColor: 'rgba(34, 139, 34, 0.1)', // Цвет закраски
        borderColor: 'rgb(34, 139, 34)', // Цвет линии
        data: [] // Данные каждой точки графика
    }]
},
 
// Настройки графиков
options: {}
});