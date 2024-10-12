export interface Author {
    author_id: number;
    author_url: string;
    content: string | null;
    creation_time: string | null;
    custom_theme_to: string | null;
    facebook_page_url: string | null;
    featured_image: string | null;
    filtered_content: string | null;
    identifier: string;
    instagram_page_url: string | null;
    is_active: number;
    layout_update_xml: string | null;
    linkedin_page_url: string | null;
    meta_description: string;
    meta_title: string;
    name: string;
    page_layout: string | null;
    relative_url: string | null;
    title: string;
    twitter_page_url: string | null;
    type: string | null;
    url: string | null;
}

export interface BlogPost {
    author: Author;
    author_id: number;
    canonical_url: string;
    category_id: number | null;
    content_heading: string | null;
    creation_time: string;
    end_time: string | null;
    featured_image: string;
    featured_img_alt: string | null;
    featured_list_image: string;
    featured_list_img_alt: string | null;
    first_image: string;
    identifier: string;
    is_active: number;
    page_layout: string | null;
    position: number;
    post_id: number;
    post_url: string;
    publish_time: string;
    search: string | null;
    title: string;
    type: string | null;
    update_time: string;
    views_count: number;
}

export const queryBNew = `query blogPosts($filter: BlogPostsFilterInput, $pageSize: Int, $currentPage: Int, $sortFiled: String, $allPosts: Boolean) {
    blogPosts(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sortFiled: $sortFiled
      allPosts: $allPosts
    ) {
      items {
        author {
          author_id
          author_url
          content
          creation_time
          custom_theme_to
          facebook_page_url
          featured_image
          filtered_content
          identifier
          instagram_page_url
          is_active
          layout_update_xml
          linkedin_page_url
          meta_description
          meta_title
          name
          page_layout
          relative_url
          title
          twitter_page_url
          type
          url
        }
        author_id
        canonical_url
        category_id
        content_heading
        creation_time
        end_time
        featured_image
        featured_img_alt
        featured_list_image
        featured_list_img_alt
        first_image
        identifier
        is_active
        page_layout
        position
        post_id
        post_url
        publish_time
        search
        title
        type
        update_time
        views_count
      }
      total_count
      total_pages
      type
    }
}`;
export const queryBNewDetail =`query BlogPostByUrlKey($url_key: String) {
        blogPostByUrlKey(url_key: $url_key) {
                author {
            author_id
            author_url
            content
            creation_time
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
            custom_theme_to
            facebook_page_url
            featured_image
            filtered_content
            identifier
            instagram_page_url
            is_active
            layout_update_xml
            linkedin_page_url
            meta_description
            meta_title
            name
            page_layout
            relative_url
            role
            short_content
            short_filtered_content
            title
            twitter_page_url
            type
            url
        }
        author_id
        canonical_url
        categories {
            canonical_url
            category_id
            category_level
            category_url
            category_url_path
            content
            content_heading
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
            custom_theme_to
            display_mode
            identifier
            include_in_menu
            is_active
            layout_update_xml
            meta_description
            meta_keywords
            meta_title
            page_layout
            parent_category_id
            path
            position
            posts_count
            posts_sort_by
            relative_url
            title
            type
        }
        category_id
        content_heading
        creation_time
        custom_layout
        custom_layout_update_xml
        custom_theme
        custom_theme_from
        custom_theme_to
        end_time
        featured_list_image
        featured_list_img_alt
        filtered_content
        first_image
        include_in_recent
        is_active
        is_recent_posts_skip
        layout_update_xml
        media_gallery {
            url
        }
        meta_description
        meta_keywords
        meta_title
        og_description
        og_image
        og_title
        og_type
        page_layout
        publish_time
        related_posts {
            ...BlogPostFields
        }
        relatedproduct_id
        relative_url
        search
        secret
        short_content
        short_filtered_content
        tag_id
        tags {
            content
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
            custom_theme_to
            identifier
            is_active
            layout_update_xml
            meta_description
            meta_keywords
            meta_robots
            meta_title
            page_layout
            relative_url
            tag_id
            tag_url
            title
            type
        }
        type
        update_time
        views_count
        ...BlogPostFields
    }
}fragment BlogPostFields on BlogPost {
    featured_image
    featured_img_alt
    identifier
    position
    post_id
    post_url
    title
publish_time
 }
`