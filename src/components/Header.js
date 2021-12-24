import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title }) => {

    const onClick = () => {
        console.log('Click');
    }

    return (
        <div className='header'>
            <h1 style = {{color: 'red'}}>{title}</h1>
            <Button text = 'Hello' color = 'black' onClick={onClick} />
        </div>
    )
}

Header.defaultProps = {
     title: 'Task is Task',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'blue' 
// }

export default Header
