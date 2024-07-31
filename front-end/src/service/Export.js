import * as XLSX from 'xlsx';
import { fetchTasks } from '../api/TaskApi.js';
const exportToExcel = async () => {
  try {
    const tasks = await fetchTasks();
    
    // Konversi data ke format yang sesuai untuk Excel
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    
    // Buat workbook baru dan tambahkan worksheet
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    
    // Generate file Excel dan unduh
    XLSX.writeFile(workbook, "tasks_export.xlsx");
  } catch (error) {
    console.error('Error exporting tasks:', error);
    // Handle error (e.g., show error message to user)
  }
};

export default exportToExcel;