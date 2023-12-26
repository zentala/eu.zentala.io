import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Posts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              # date
            }
            excerpt
          }
        }
      }
    }
  `)

  return (
    <div className="posts">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.frontmatter.title}>
          <h2>{node.frontmatter.title}</h2>
          <p>{node.frontmatter.date}</p>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
  )
}

export default Posts
