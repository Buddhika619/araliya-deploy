import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  keyword = "",
  category = "",
  filter = "",
}) => {
  console.log(filter, keyword);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              filter && category
                ? `/category/${category}/sort/${filter}/${x + 1}`
                : filter && keyword
                ? `/search/${keyword}/sort/${filter}/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : category
                ? `/category/${category}/page/${x + 1}`
                : filter
                ? `/sort/${filter}/page/${x + 1}`
                : `/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

// if (!category) {
//   if (keyword) {
//     return `/search/${keyword}/page/${x + 1}`
//   } else {
//     return `/page/${x + 1}`
//   }
// }else if(filter) {
//    return `/sort/${filter}/page/${x + 1}`
// }
// else {
//   return `/category/${category}/page/${x + 1}`
// }

// if(filter && category){
//   return `/category/${category}/sort/${filter}/${x+1}`
// }else if (filter && keyword){
//   return `/search/${keyword}/sort/${filter}/${x+1}`
// }else if (keyword){
//   return `/search/${keyword}/page/${x + 1}`
// }else if(category){
//   `/category/${category}/page/${x + 1}`
// }else if(filter){
//   return `sort/${filter}/page/${x+1}`
// }else{
//   return `/page/${x + 1}`
// }

export default Paginate;
