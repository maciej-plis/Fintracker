package matthias.expense_tracker.purchase.shops;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Table(name = "purchase_shop")
@Entity
public class ShopEntity extends BaseEntity {

    private String name;
}
