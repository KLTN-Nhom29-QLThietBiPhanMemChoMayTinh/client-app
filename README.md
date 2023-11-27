# App Quản lý thiết bị phần mềm cho phòng máy tính DHCN

## ảnh minh họa
![...](./AnhMinhHoa/img_minhHoa.png)
![...](./AnhMinhHoa/img_code.png)

### Page Brand
![...](./AnhMinhHoa/img_PageBrand.png)
### ảnh quản lý phòng
![QL Phòng](./AnhMinhHoa/img_QLPhong.png)
![QL Phòng](./AnhMinhHoa/img_QLPhong_Form.png)

### ảnh quản lý khu vực
![QL khu vực](./AnhMinhHoa/img_QLKhuVuc.png)
![QL khu vực](./AnhMinhHoa/img_Detail_KhuVuc.png)
![QL khu vực](./AnhMinhHoa/img_QLKhuVuc_Form.png)


### ảnh quản lý tầng
![QL tầng](./AnhMinhHoa/img_QLTang.png)
![QL tầng](./AnhMinhHoa/img_QLTang_form.png)

### ảnh quản lý môn học
![QL môn](./AnhMinhHoa/img_QLMon.png)
![QL môn](./AnhMinhHoa/img_QLMon_form.png)

### ảnh quản lý Thiết bị
![QL Thiết bị](./AnhMinhHoa/img_QLThietbi.png)
![QL Thiết bị](./AnhMinhHoa/img_QLThietbi_form.png)

### ảnh quản lý Phần mềm
![QL Thiết bị](./AnhMinhHoa/img_QLPhanMem.png)

### ảnh quản lý Nhân viên
![QL Nhân viên](./AnhMinhHoa/img_QLNhanVien.png)

### ảnh quản lý Khoa
![QL Khoa](./AnhMinhHoa/img_QLKhoa.png)
![QL Khoa](./AnhMinhHoa/img_QLKhoa_form.png)

### ảnh quản lý Giáo viên
![QL Giáo viên](./AnhMinhHoa/img_QLGiaoVien.png)

### ảnh quản lý tai khoan
![QL tai khoan](./AnhMinhHoa/img_QLTaiKhoan.png)

### ảnh quản lý mayTinh
![QL tai khoan](./AnhMinhHoa/img_QLMayTinh.png)
![QL tai khoan](./AnhMinhHoa/img_QLMayTinh_form.png)

### ảnh Login
![login](./AnhMinhHoa/img_login.png)

### Ảnh Page Profile 
![Anh Profile](./AnhMinhHoa/img_PageProfile.png)

### ảnh lich Truc
![ lich Truc](./AnhMinhHoa/img_pcLichTruc.png)
![ lich Truc](./AnhMinhHoa/img_pcLichTruc_form.png)

### ảnh lich Thuc HAnh
![lich Thuc HAnh](./AnhMinhHoa/img_pcLichThucHanh.png)
![lich Thuc HAnh](./AnhMinhHoa/img_pcLichThucHanh_form.png)

## note del
* load lai data trang home
    - dispatch(setStatusDataMoi(true))


## Note
    - cần sửa lại tabbar link chưa phù hợp - 90%
    - can tang khoang cach giua component - z (dang ep cứng khoang cach)
    - can lay va chuyen data qu cac man hinh - z
    - overFlow -z 
    - FormAddPhong - chua bat su kien cua checkbox - z
    - thêm phong phải them dược cac so may - so thiet bị - so phan mem -z
    - chưa sử lý tgian hết hạn sử dụng của Tbi - PM (dang them +1 vao thang) - y
    - ModalChangePass: gui data redux -- Call Api - z
    - FormAddPhong: chua co check data co ToaNha vs tang - z
    - FormAddGiaoVien: api add TaiKhoan Thanh cong -- api Add GV errr 500 -- update theeo server mới thử- good look = z (fix them tai khoan trong api insert cua GV)
    - tìm kiếm -  detailKhuVuc chưa có gì - z
    - PageQLPhongMay - chua co sk  btn update - detail - z
    - PageQLPhanMem - chuc nang CRUD chua co gi -z
    - PageQlMonHoc can test lai cot trang thai  -z 
    - PageQLThietBi: Chuc nang CRUD chua co - z
    - PageQLNhanVien: Chuc nang CRUD chua co - z
    - PageQLKhoa: Chuc nang CRUD chua co - z
    - PageQLTaiKhoan: Chuc nang CRUD chua co - z
    - pageHome: phai the hien duoc dang o btn naof -z
    - PageLichTruc: data api chua co - handleSearch chua co - select theo thang nam - update - del -z
    - FormAddLichTruc: del select Tgian truc - z
    - pageHome: chua data api local - z
    - pageLogin: chua formik - api local - z
    - pageLogin - dựa username lây thông tin nguoi dung - z
    - PageQlKhuVuc: Chua co Update vs APi - z
    - useLocaton() : chuyển component A -> b kem theo giá tri -z
    - QL Phong khi them 1 phong chon so luong máy tính(VD 5 cai) có thế mặc định add 5 cái may tinh không? 
    - PageQLKhoa - update: chua biet tat model
    - FormAddPhong: api chua duoc
    - taiKhoanReducer: chua co api update
    - FormAddPhongMay: them moi  tung obj moi - add mayTinh - add phong - add phan mem vs Phong
    -- Add phong (tao phong - phanMem_Phong -mayTinh(co maPhong) - mayTinh_ThietBI)
    -- Page home: Cần hiên text red cho phòng may hay may tinh nào bị lỗi - chac cần 1 api co kèm theo status gì đó
    - QLMayTInh: finhs GUi select Phong may -> gui len redux = >datasearch -> checkTH(test) -> select trang thai -> redux -> dataSearch => test  
    - lichTrucReducer :có api server rồi - update di - T sửa page QL vs form add rồi 
    - lichTrucReducer: api lỗi TangChuaCoNhanVienTrucTrongThang .
    - QL phần mềm chưa có event update - del
    - PageQlMonHoc - search chưa có 
    - update Lich truc : loi api

    - PageQLPhongMay - can 1 search theo status
    - FormAddPhong - Formupdate- can checkbox ALL
    - PageQLPhongMay - chua co ai quan ly o do
    - PageQlMonHoc: Chuc nang CRUD chua co
    - pageHome: su dung phan trang de thay the cho over_flow_auto
    - userReducer - getDangNhapApi() chua co cookie
    - userReducer - luu username vs token - chua luu token - xem quyen de gui di den trang cho GV || QL
    - QL Tang: chua co API update
    - QL phong may nen có người trực ở đó 
    - QL phong may tao co the tạo kèm theo may tính
    -- gans valueSearch vaf valueSelect
    --  error - select value: mối khi reset lại
    - PageQLNhanVien: xoa NV có lịch trực bị lỗi 500
    - PageLichTruc: xóa 1 lich truc cung bi lỗi 500
    - mayTinhReducer: chua toi uu duoc dataSearch()
    - Form add mayTinh -> subMit -> api - > update -> del
    - QLThietbi: "Chưa có api xoa thietbi ( xóa 1 thiet bị xóa cả MaytinhThietbij liên quan )
    - PageQlMonHoc CRUD chua co gi
    - Page update duoc gui từ deltail thi phai sửa - lấy data theo api maID chứ không chả về page QL
    - deletePhanMemApi: xoa phần mêm có kêt nối phòng máy không được
    - lên thông nhất sử dụng Bị hỏng hay không sử dụng

    # PageQlMonHoc
    - tạo mới có so buoi vs ngày bd +> ngay kết thúc (sau Tgian thực 1 tuần)
    - ứng vs số buổi sẽ tạo so lượng ca  của môn đó bằng so buôi (mon học)
    - dựa theo controller DSMonHocPhanMem/maMon  đểtạo status (đợi mởi lớp (controller có length = 0 ) hay là dang học(controller có length > 0 ))
    - dựa theo controller DSMonHocPhanMem/maMon co thể lấy số lượng ca TH dã tạo so sanh vs so buổi dể khogno cho tạo ca TH mới nữa
    - getDSPhong_trungPM_MonHocApi() (chua hiểu giá tri ở trong) -> show PM môn hoc -> 

    #
    - ComponentModalGhiChu: err check box trùng value (mavalue) - lấy thông tin - xác nhận gửi
        + api thong báo - gửi ghi chú cùng thietbi bị lỗi  lưu data
        + btn sửa (bên cạnh textErr Thiet bị lỗi) hiên 1 modal chon cac tbi lỗi đã sủa xong cap nhật vao data;
        + chú ý cần cập nhật status ở mayTinhTHietbi và PhongMayPhanmem
        + thông báo: 
            - ma
            - noteGhi err
            - người ghi
            - tgian ghi
            - noteGhi sửa 
            - người Sửa
            - Tgian sửa



## Tài liệu

* useLocation() - [link](https://medium.com/@stheodorejohn/exploring-react-router-dom-understanding-the-uselocation-hook-f67742e71c0c)
* Lấy giá trị tham số từ chuối truy vấn? [link](https://www.javascripttutorial.net/es-next/javascript-object-fromentries/)
* sort js - [link](https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value)

    
## error
![image err](./AnhMinhHoa/img_error.png)

### fix error
* Cannot add property 2, object is not extensible - structuredClone() ( [Link Fix](https://stackoverflow.com/questions/59648434/material-table-typeerror-cannot-add-property-tabledata-object-is-not-extensibl) )
    - một đối tượng có thể mở rộng và có thể thêm các thuộc tính mới vào nó. Tuy nhiên, trong trường hợp này, Object.preventExtensions()một đối tượng đã được đánh dấu là không thể mở rộng được nữa, do đó nó sẽ không bao giờ có các thuộc tính vượt quá những thuộc tính mà nó có tại thời điểm nó được đánh dấu là không thể mở rộng được.
