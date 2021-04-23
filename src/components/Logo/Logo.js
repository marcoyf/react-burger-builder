import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        {/* simply provide the actual source path won't work because Webpack will bundle this image in a different folder */}
        {/* to make Webpack aware that we're using this image, we need to use import */}
        {/* <img src="../../assets/images/burger-logo.png" alt="Burger Builder" /> */}
        <img src={burgerLogo} alt="Burger Builder" />
    </div>
);

export default logo;