export default function ColorPicker({ selectedColor, onColorChange }) {
  const colorArr = ["blue", "red", "green"];
  return (
    <select value={selectedColor} onChange={e => onColorChange(e.target.value)}>
      {colorArr.map(c => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
