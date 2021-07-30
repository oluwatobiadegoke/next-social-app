import { Scrollbars } from "react-custom-scrollbars";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "#ced1d4",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const Scroll = (props) => {
  return (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      universal
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
    >
      {props.children}
    </Scrollbars>
  );
};

export default Scroll;
