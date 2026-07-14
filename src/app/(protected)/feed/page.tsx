import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { StoriesRow } from "@/components/layout/StoriesRow";
import { PostComposer } from "@/features/posts/components/PostComposer";
import { Feed } from "@/features/posts/components/Feed";

export default function FeedPage() {
  return (
    <div className="container _custom_container">
      <div className="_layout_inner_wrap">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
            <LeftSidebar />
          </div>

          {/* Center feed */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="_layout_middle_wrap">
              <div className="_layout_middle_inner">
                <StoriesRow />
                <PostComposer />
                <Feed />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
