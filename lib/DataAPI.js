import _ from 'lodash';

class DataAPI {
  constructor() {
  }
  transformData = (state, args) => {
    const coin = args[0].slice(0,3);
    let rawChange = parseFloat(args[4]);
    let change = rawChange * 100;
    let vol = args[5].slice(0, (args[5].length - 5));

    let newData = {'coin':args[0], 'price':args[1], 'vol':parseFloat(vol), 'change':change.toPrecision(4)};
    if(coin === 'BTC'){
      if(!(_.includes(state.symboles, args[0], 0))){
        const symLength = _.size(state.symboles);
        state.symboles[symLength] = args[0];

        const length = _.size(state.data);
        state.data[length] = newData;
      }
      else{
        let mddata = state.data;
        _.each( mddata, (data, idx) => {
          if(_.isEqual(data.coin, args[0])){
            state.data[idx] = newData;
          }
        });
      }
      state.data = _.orderBy(state.data, ['vol'], ['desc']);
      return state.data;
    }
    else{
      return state.data;
    }
  }
}

export default DataAPI;
