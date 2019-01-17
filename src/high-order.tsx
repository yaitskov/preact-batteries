import { Component, h } from 'preact';

const enhanceComponent = (C, styles) =>
  class Enhance extends Component {
    render() {
      return <C {...{...this.props, styles: styles}}/>;
    }
  };


const OriginalTitle = ({styles}) => <h1 style={styles}>hello world</h1>;
export const EnhancedTitle = enhanceComponent(OriginalTitle, 'border: 1px solid green');

//export default EnhancedTitle;
