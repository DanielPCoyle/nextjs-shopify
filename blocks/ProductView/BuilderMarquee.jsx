import Marquee from "react-fast-marquee";


export const BuilderMarquee = (props) => {
  return<Marquee {...props}>
    {props.children.map((child, index) => {
      return <div key={index} className="marquee-item" style={{marginRight:props.gap, color:child?.color ?? "black"}}>{child?.content}</div>
    })}
  </Marquee>
};
