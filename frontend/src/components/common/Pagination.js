import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages =[];
  for (let i = 1; i <= Math.ceil(total/ limit); i++) {
    numPages.push(i);
  }

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {numPages.map((number) => (
            <Button
              key={number}
              onClick={() => setPage(number)}
              aria-current={page === number ? "page" : null}
            >
              {number}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total / limit)}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;