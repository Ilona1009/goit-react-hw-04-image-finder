import { StyledBtn, StyledBtnBox } from './Buttonstyled';
export function LoadMoreBtn({ onLoadMore }) {
  return (
    <StyledBtnBox>
      <StyledBtn onClick={onLoadMore} type="button">
        load more
      </StyledBtn>
    </StyledBtnBox>
  );
}
