import classes from './Spinner.module.css';

const spinner = () => (
    // got CSS spinner from https://projects.lukehaas.me/css-loaders/
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;