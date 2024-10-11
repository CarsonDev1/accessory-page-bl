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