class PostsController < ApplicationController
  before_action :set_people
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    render json: @people.posts
  end

  def show
    render json: @post
  end

  def create
    post = @people.posts.new(post_params)

    if post.save
      render json: post
    else
      render json: post.errors, status: 422
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: 422
    end
  end

  def destroy
    @post.destroy
  end

  private

  def set_people
    @people = People.find(params[:people_id])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:name, :description, :price)
  end
end
