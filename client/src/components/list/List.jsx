import "./list.scss";
import Card from "../card/Card";

const List = ({ posts = [] }) => {
  return (
    <div className="list">
      {posts.length ? (
        posts.map((item) => (
          <Card key={item.id} item={item} />
        ))
      ) : (
        <p>No items to display</p>
      )}
    </div>
  );
};

export default List;
