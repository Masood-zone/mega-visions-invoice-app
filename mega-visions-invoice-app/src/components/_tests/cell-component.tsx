import { deleteIcon, editIcon, viewIcon } from "../../assets/svgs";

function CellComponent({
  params,
  onView,
  onEdit,
  onDelete,
}: {
  params: {
    data: {
      id: string;
    };
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* View */}
      <button onClick={() => onView(params?.data?.id)}>
        <img src={viewIcon} alt="view-icon" />
      </button>
      {/* Edit */}
      <button onClick={() => onEdit(params?.data?.id)}>
        <img src={editIcon} alt="edit-icon" />
      </button>
      {/* Delete */}
      <button onClick={() => onDelete(params?.data?.id)}>
        <img src={deleteIcon} alt="delete-icon" />
      </button>
    </div>
  );
}

export default CellComponent;
