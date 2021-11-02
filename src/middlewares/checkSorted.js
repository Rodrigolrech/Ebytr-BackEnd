const checkSorted = (req, res, next) => {
  let { sorted } = req.body;
  if (!sorted) {
    sorted = 'createdDate';
    req.body.sorted = 'createdDate';
  }
  if (sorted === 'createdDate' || sorted === 'taskDescription' || sorted === 'status') {
    return next();
  }
  return res.status(400).json({ message: 'Invalid sorted method' });
};

module.exports = checkSorted;
