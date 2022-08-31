interface Props {
  data: string;
}

const Details = (props: Props) => {
  return <div>Selected Date: {props.data}</div>;
};

export default Details;
