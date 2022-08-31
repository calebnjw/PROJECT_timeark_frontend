interface Props {
  data: string;
}

const Details = (props: Props) => {
  return <div>{props.data}</div>;
};

export default Details;
