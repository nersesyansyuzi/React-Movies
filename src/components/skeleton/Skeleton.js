import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={327}
    viewBox="0 0 280 327"
    backgroundColor="#c4c4c4"
    foregroundColor="#fafafa"
    // backgroundColor="#b8b8b8"
    // foregroundColor="#fafafa"
    {...props}
  >
    <rect x="6" y="20" rx="0" ry="0" width="186" height="276" /> 
    <rect x="6" y="310" rx="0" ry="0" width="187" height="20" />
  </ContentLoader>
)

export default Skeleton