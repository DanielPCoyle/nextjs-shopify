import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
}

const App = () => {
  function renderCell(date) {
    const list = getTodoList(date);
    
    // return  list.length ? <div style={{background:"black",color:"white",  borderRadius:10}}><h1 style={{padding:0,margin:0}}>{list.length }</h1><small>Events</small></div>  : null;

    return list.length ?  <img style={{width:"100%"}} src={"https://static.wixstatic.com/media/a7970f_b46fcdf1745b4682b870e733d470e430~mv2.png/v1/fill/w_986,h_1315,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/a7970f_b46fcdf1745b4682b870e733d470e430~mv2.png?quality=60&width=200&height=200"} /> : null

  }

  return <Calendar  renderCell={renderCell} />;
};

export default App;