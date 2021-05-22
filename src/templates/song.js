import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SongTemplate = ({ data, location }) => {
  const song = data.markdownRemark
  console.dir(song)
  const siteTitle = data.site.siteMetadata?.title
  const { previous, next } = data
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={song.frontmatter.title}
        description={song.frontmatter.description || song.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{song.frontmatter.title}</h1>
          <p>{song.frontmatter.date}</p>
        </header>
        {
          song.frontmatter.image ? (
            // <StaticImage src={song.image} />
              <img src={song.frontmatter.image} alt=""/>
          ) : null
        }
        {
          song.audio ? (
            <section>
              <h4>Audio Recording</h4>
              <audio src={song.audio}></audio>
            </section>
          ) : null
        }
        {
          song.instrumental ? (
            <section>
              <h4>Instrumental</h4>
              <audio src={song.instrumental}></audio>
            </section>
          ) : null
        }
        {
          song.video ? (
            <section>
              <h4>Video</h4>
              <video src={song.video}></video>
            </section>
          ) : null
        }
        {
          song.instructions ? (
            <section>
              <h4>Stage direction</h4>
              <div dangerouslySetInnerHTML={{ __html: song.instructions }}/>
            </section>
          ) : null
        }
        {
          song.html ? (
            <section>
              <h4>Lyrics</h4>
              <div dangerouslySetInnerHTML={{ __html: song.html }}/>
            </section>
          ) : null
        }
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default SongTemplate

export const pageQuery = graphql`
  query SongPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        order
        image
        audio
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
