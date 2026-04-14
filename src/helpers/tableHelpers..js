export const getLineNumber = (pagination, index) => {
  const firstItem = (pagination?.page - 1) * pagination?.perpage + 1;
  const lineNumber = pagination ? firstItem + index : index + 1;

  return lineNumber;
};
