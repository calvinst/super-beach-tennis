const ModalRanking = ({ ranking, isOpen, setIsOpen }) => {
  function fecharModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  return (
    <dialog open={isOpen} id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={fecharModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="card bg-base-100 shadow mt-4">
          <div className="card-body">
            <h2 className="card-title">🏆 Ranking Final</h2>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Jogador</th>
                    <th>Games</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((r, index) => (
                    <tr key={r.jogador.id}>
                      <td>{index + 1}</td>
                      <td>{r.jogador.nome}</td>
                      <td>{r.games}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalRanking;
