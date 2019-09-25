class Api::PeopleController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.random_peoples(current_user.liked_peoples)
  end

  def update
    current_user.liked_peoples << params[:id].to_i
    current_user.save
  end

  def my_peoples
    render json: User.liked(current_user.liked_peoples)
  end
end
