class DucklogsController < ApplicationController
  def create
     ducklog = Ducklog.new(ducklog_params)
     if ducklog.save
        render json: ducklog, status: :created
     else
      render json: { errors: ducklog.errors }, status: :unprocessable_entity
     end
  end

  def index
    ducklogs = Ducklog.all
    render json: ducklogs
  end

  def show
    ducklog = Ducklog.find(params[:id])
    render json: ducklog
  end

  def update
    ducklog = Ducklog.find(params[:id])
    if ducklog.update(ducklog_params)
      render json: ducklog
    else
      render json: { errors: ducklog.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    ducklog = Ducklog.find(params[:id])
    ducklog.destroy
    render json: { message: 'Deleted' }, status: :no_content
  end

  private
  def ducklog_params
    params.require(:ducklog).permit(:title, :content)
  end
end
