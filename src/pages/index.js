import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const songs = data.allMarkdownRemark.nodes

  if (songs.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Thomas & the Unicorn" />
        <Bio />
        <p>
          No songs found. The Unicorn is sad!
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Thomas & the Unicorn" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {songs.map(song => {
          const title = song.frontmatter.title || song.fields.slug

          return (
            <li key={song.fields.slug}>
              <article
                className="song-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={song.fields.slug} itemProp="url">
                      <span>{`${song.order}. `}</span>
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: song.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          order
        }
      }
    }
  }
`
