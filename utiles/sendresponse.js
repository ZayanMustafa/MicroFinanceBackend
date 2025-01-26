export const sendResponse = (res, statusCode, data, error, message) => {
    res.status(statusCode).json({
      success: !error,
      data: data || null,
      error: error || null,
      message: message || null,
    });
  };
  