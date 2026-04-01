const ModalRanking = ({ ranking, isOpen, setIsOpen }) => {
  console.log("ranking", ranking);
  function fecharModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  function getRowClass(index) {
    if (index === 0) return "bg-yellow-400/10";
    if (index === 1) return "bg-gray-400/10";
    if (index === 2) return "bg-orange-400/10";
    return "";
  }

  return (
    <dialog open={isOpen} id="my_modal_3" className="modal">
      <div className="modal-box p-2">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={fecharModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="card mt-4">
          <div className="card-body p-1">
            <h2 className="card-title">🏆 Ranking Final</h2>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Jogador</th>
                    <th>Vitórias</th>
                    <th>Games</th>
                    <th>Zerados</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((r, index) => (
                    <tr key={r.jogador.id} className={getRowClass(index)}>
                      <td className="text-center">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}</td>
                      <td className="p-0">{r.jogador.nome}</td>
                      <td className="text-right">{r.vitorias}</td>
                      <td className="text-right">{r.games}</td>
                      <td className="text-right">{r.zerados}</td>
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
