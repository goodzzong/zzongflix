import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'home', videos });
  } catch (error) {
    console.error(error);
    res.render('home', { pageTitle: 'home', videos: [] });
  }
};
export const search = async (req, res) => {
  const { query: { term: searchingBy } } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
  } catch (error) {
    console.error(error);
  }
  res.render('search', { pageTitle: 'search', searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'upload' });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  try {
    const { params: { id } } = req;
    const video = await Video.findById(id);
    res.render('videoDetail', { pageTitle: 'videoDetail', video });
  } catch (error) {
    console.error(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const {
      params: {
        id,
      },
    } = req;
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.error(error);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  try {
    const {
      body: { title, description },
      params: { id },
    } = req;
    const video = await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(video.id));
  } catch (error) {
    console.error(error);
    res.redirect(routes.home);
  }
};


export const deleteVideo = async (req, res) => {
  try {
    const {
      params: {
        id,
      },
    } = req;
    await Video.findOneAndRemove({ _id: id });
    // res.render('deleteVideo', { pageTitle: 'deleteVideo' })
  } catch (error) {
    console.error(error);
  }
  res.redirect(routes.home);
};
