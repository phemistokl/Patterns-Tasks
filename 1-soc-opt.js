'use strict';

// Tasks for rewriting:
//   - Watch week 1 lectures about SoC, SRP, code characteristics, V8
//   - Apply optimizations of computing resources: processor, memory
//   - Minimize cognitive complexity
//   - Respect SRP and SoC
//   - Improve readability (understanding), reliability
//   - Optimize for maintainability, reusability, flexibility
//   - Make code testable
//   - Implement simple unittests without frameworks
// Additional tasks:
//   - Try to implement in multiple paradigms: OOP, FP, procedural, mixed
//   - Prepare load testing and trace V8 deopts

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const makeArrayFromCSV = (csv) => {
  const cityArray = [];
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      let cell = isNaN(cells[j]) ? cells[j] : parseInt(cells[j]);
      rowObject[headers[j]] = cell;
    }
    cityArray.push(rowObject);
  }
  return cityArray;
}

const tableSort = (data, headIndex = 'amount') => {
  return data.sort((r1, r2) => r2[headIndex] - r1[headIndex]);
}
class Table {
  constructor(data) {
    this.data = data;
  }
  
  getTable(tableIndex) {
    const table = [];
    let maxDensity = 0;

    for (const elem of this.data) {
      const density = parseInt(elem.density);
      if (density > maxDensity) maxDensity = density;
      table.push({ city: elem.city.trim(), population: elem.population, area: elem.area, density: elem.density, country: elem.country });
    }
    for (const elem of table) {
      const a = Math.round((elem[tableIndex] * 100) / maxDensity);
      elem.amount = parseInt(a.toString());
    }
    
    return tableSort(table, 'amount');
  }
}

const convertedData = makeArrayFromCSV(data);
const table = new Table(convertedData);
console.table(table.getTable('density'));