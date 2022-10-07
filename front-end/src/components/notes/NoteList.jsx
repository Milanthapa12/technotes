import Note from "./Note";
import { useGetNotesQuery } from "./noteApiSlice";

function NoteList() {
  const { data, isLoading, isSuccess, isError, error } = useGetNotesQuery();
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    content = (
      <p className={isError ? "errorCls" : ""}>{error?.data?.message}</p>
    );
  }

  const tableContent =
    data?.ids?.length > 0
      ? data?.ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

  content = (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
  return content;
}

export default NoteList;
