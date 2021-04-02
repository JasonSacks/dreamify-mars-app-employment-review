import { DatePicker } from '@material-ui/pickers/DatePicker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/date-fns';

const EarthDateSelector = ({ style, earthDate, onEarthDateChange }) =>
{  
    const defaultDate = new Date('2021-02-20');
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
            label="Earth Date"
            style={style}
            value={earthDate}
            format="MM/dd/yyyy"
            minDate={defaultDate}
            maxDate={new Date()}
            onChange={(newValue) => {
               onEarthDateChange(newValue);
            }}/>
        </MuiPickersUtilsProvider>
       );
}

export default EarthDateSelector;