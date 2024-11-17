import request from "@/utils/request";

const DEPT_BASE_URL = "/api/v1/dept";

const DeptAPI = {
  /**
   * 获取部门列表
   *
   * @param queryParams 查询参数（可选）
   * @returns 部门树形表格数据
   */
  getList(queryParams?: DeptQuery) {
    return request<DeptVO[]>({
      url: `${DEPT_BASE_URL}`,
      method: "GET",
      data: queryParams,
    });
  },

  /** 获取部门下拉列表 */
  getOptions() {
    return request<OptionType[]>({
      url: `${DEPT_BASE_URL}/options`,
      method: "GET",
    });
  },

  /**
   * 获取部门表单数据
   *
   * @param id 部门ID
   * @returns 部门表单数据
   */
  getFormData(id: number) {
    return request<DeptForm>({
      url: `${DEPT_BASE_URL}/${id}/form`,
      method: "GET",
    });
  },

  /**
   * 新增部门
   *
   * @param data 部门表单数据
   * @returns 请求结果
   */
  add(data: DeptForm) {
    return request({
      url: `${DEPT_BASE_URL}`,
      method: "POST",
      data: data,
    });
  },

  /**
   * 修改部门
   *
   * @param id 部门ID
   * @param data 部门表单数据
   * @returns 请求结果
   */
  update(id: number, data: DeptForm) {
    return request({
      url: `${DEPT_BASE_URL}/${id}`,
      method: "PUT",
      data: data,
    });
  },

  /**
   * 删除部门
   *
   * @param ids 部门ID，多个以英文逗号(,)分隔
   * @returns 请求结果
   */
  deleteByIds(ids: string) {
    return request({
      url: `${DEPT_BASE_URL}/${ids}`,
      method: "DELETE",
    });
  },
};

export default DeptAPI;

/** 部门查询参数 */
export interface DeptQuery {
  /** 搜索关键字 */
  keywords?: string;
  /** 状态 */
  status?: number;
}

/** 部门类型 */
export interface DeptVO {
  /** 子部门 */
  children?: DeptVO[];
  /** 创建时间 */
  createTime?: Date;
  /** 部门ID */
  id?: number;
  /** 部门名称 */
  name?: string;
  /** 部门编号 */
  code?: string;
  /** 父部门ID */
  parentId?: number;
  /** 排序 */
  sort?: number;
  /** 状态(1:启用；0:禁用) */
  status?: number;
  /** 修改时间 */
  updateTime?: Date;
}

/** 部门表单类型 */
export interface DeptForm {
  /** 部门ID(新增不填) */
  id?: number;
  /** 部门名称 */
  name?: string;
  /** 部门编号 */
  code?: string;
  /** 父部门ID */
  parentId: number;
  /** 排序 */
  sort?: number;
  /** 状态(1:启用；0：禁用) */
  status?: number;
}
