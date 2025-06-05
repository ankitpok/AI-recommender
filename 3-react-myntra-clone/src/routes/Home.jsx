// import { useSelector } from "react-redux";
// import HomeItem from "../components/HomeItem";
// import FlipkartProductsList from "../components/FlipkartProductsList";

// const Home = () => {
//   const items = useSelector((store) => store.items);

//   return (
//     <main>
//       <div className="items-container">
//         {items.map((item) => (
//           <>
//           {/* <HomeItem key={item.id} item={item}></HomeItem> */}
//           <FlipkartProductsList > </FlipkartProductsList>
//           </>
//         ))}
//       </div>
//     </main>
//   );
// };
// export default Home;
// Home.jsx
import FlipkartProductsList from "../components/FlipkartProductsList";

const Home = () => {
  return (
    <main>
      <div className="items-container">
        <FlipkartProductsList />
      </div>
    </main>
  );
};

export default Home;
