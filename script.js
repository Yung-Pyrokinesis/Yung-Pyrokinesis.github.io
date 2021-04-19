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
   console.log(beta,gamma,alpha,mu);
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
