import './Name.css';

const Name = (props) => {
  return (
    <div id='name-div'><a href={'#' + props.name}>{props.name}</a></div>
  )
}

export default Name;